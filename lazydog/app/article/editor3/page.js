"use client";
import React, { useState } from 'react'
import FroalaEditorComponent from 'react-froala-wysiwyg'
import 'froala-editor/css/froala_style.min.css'
import 'froala-editor/css/froala_editor.pkgd.min.css'
import 'froala-editor/js/plugins.pkgd.min.js'

export default function MyEditor() {
  const [content, setContent] = useState('')

  return (
    <FroalaEditorComponent
      tag="textarea"
      model={content}
      onModelChange={setContent}
      config={{
        language: 'zh_tw',
        placeholderText: '請輸入內容...',
        toolbarButtons: ['bold', 'italic', 'underline', 'insertImage', 'insertLink'],
        imageUploadURL: '/api/froala-upload?type=image', // 設定上傳 API
        imageAllowedTypes: ['jpeg', 'jpg', 'png', 'gif'], // 限制允許的格式
        imageUploadMethod: 'POST', // 使用 POST 上傳
        events: {
          'image.beforeUpload': function (files) {
            console.log('準備上傳圖片:', files)
          },
          'image.uploaded': function (response) {
            console.log('圖片上傳成功:', response)
          },
          'image.inserted': function (img) {
            console.log('圖片已插入:', img)
          },
          'image.error': function (error) {
            console.error('圖片上傳錯誤:', error)
          },
        },
      }}
    />
  )
}
