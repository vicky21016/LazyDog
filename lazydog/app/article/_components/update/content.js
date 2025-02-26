'use client';

import React, { useEffect, useRef } from 'react';
import FroalaEditor from 'froala-editor';
import 'froala-editor/js/languages/zh_tw.js';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/js/plugins.pkgd.min.js';

// 定義前端和後端圖片路徑的基礎 URL
const FRONTEND_IMAGE_BASE = 'http://localhost:3000/';
const BACKEND_IMAGE_BASE = 'http://localhost:5000/api/articles/';

export default function FroalaEditorWrapper({ content, onContentChange }) {
  const editorRef = useRef(null);
  const editorInstanceRef = useRef(null); // 用於保存 Froala 實例
  const isInitializedRef = useRef(false); // 用於標記編輯器是否已初始化

  // 將前端圖片路徑轉換為後端路徑
  const convertFrontendToBackendImagePath = (htmlContent) => {
    const regex = new RegExp(`${FRONTEND_IMAGE_BASE}([a-f0-9-]+)(\\\\?)`, 'g');
    return htmlContent.replace(regex, (match, imageId) => {
      return `${BACKEND_IMAGE_BASE}${imageId}.png`;
    });
  };

  // 處理初始化內容的轉換
  const getProcessedContent = () => {
    return content ? convertFrontendToBackendImagePath(content) : '';
  };

  useEffect(() => {
    if (editorRef.current && !editorInstanceRef.current) {
      editorInstanceRef.current = new FroalaEditor(editorRef.current, {
        language: 'zh_tw',
        toolbarButtons: ['bold', 'italic', 'underline', 'insertImage', 'insertLink', 'html'],
        pluginsEnabled: ['image', 'link', 'html'],
        events: {
          initialized: function () {
            isInitializedRef.current = true;
            const processedContent = getProcessedContent();
            if (processedContent) {
              this.html.set(processedContent);
            }
          },
          contentChanged: function () {
            if (isInitializedRef.current) {
              const content = this.html.get();
              console.log("🔹 Froala 內容變更:", content);
              onContentChange(content); // ✅ 回傳內容給父組件
            }
          },
        },
      });
    }

    return () => {
      if (editorInstanceRef.current) {
        editorInstanceRef.current.destroy();
        editorInstanceRef.current = null;
        isInitializedRef.current = false;
      }
    };
  }, [onContentChange]);

  // 當外部 content 更新時，同步轉換路徑並更新編輯器
  useEffect(() => {
    if (isInitializedRef.current && editorInstanceRef.current) {
      const processedContent = getProcessedContent();
      if (processedContent !== editorInstanceRef.current.html.get()) {
        editorInstanceRef.current.html.set(processedContent);
      }
    }
  }, [content]);

  return <div ref={editorRef}></div>;
}