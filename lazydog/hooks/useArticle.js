"use client"

import { useState, useEffect } from 'react'

const API_URL = 'http://localhost:5000/api/articles'

function useArticles() {
    const [articles, setArticles] = useState([])
    const [article, setArticle] = useState(null)
    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    // 取得所有文章（列表用）
    const getArticles = async () => {
        setLoading(true)
        try {
            const response = await fetch(API_URL)
            if (!response.ok) throw new Error('無法取得文章')
            const data = await response.json()
            setArticles(data)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    // 取得單篇文章（詳情用）
    const getArticle = async (id) => {
        if (!id) {
            setArticle(null)
            setComments([])
            return
        }
        
        let isCurrentRequestValid = true // 競態條件控制
        
        try {
            setLoading(true)
            setError(null)
            
            const response = await fetch(`${API_URL}/${id}`)
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
            
            const data = await response.json()
            
            // 重要修正：直接使用 data 而非 data.article
            if (isCurrentRequestValid) {
                setArticle(data)         // 直接設定整個 data 到 article
                setComments(data.comments || []) // 從 data 取 comments
            }
        } catch (err) {
            if (isCurrentRequestValid) {
                setError(err.message)
                setArticle(null)
            }
        } finally {
            if (isCurrentRequestValid) setLoading(false)
        }

        return () => { isCurrentRequestValid = false } // 清除陳舊請求
    }

    // 新增文章
    const createArticle = async (newArticle) => {
        setLoading(true)
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newArticle),
            })
            if (!response.ok) throw new Error('無法新增文章')

            const createdArticle = await response.json()
            setArticles([createdArticle, ...articles]) // 將新文章加入列表
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    // 更新文章
    const updateArticle = async (id, updatedData) => {
        setLoading(true)
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedData),
            })
            if (!response.ok) throw new Error('無法更新文章')

            const updatedArticle = await response.json()
            setArticles(articles.map((article) => (article.id === id ? updatedArticle : article)))
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    // **刪除文章**
    const deleteArticle = async (id) => {
        setLoading(true)
        try {
            const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
            if (!response.ok) throw new Error('無法刪除文章')

            setArticles(articles.filter((article) => article.id !== id)) // 移除文章
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    // **在元件載入時自動取得文章**
    useEffect(() => {
        getArticles()
    }, [])

    return {
        articles,
        article,
        comments,
        loading,
        error,
        getArticles,
        getArticle,
    }
}

export default useArticles
