'use client';

import React, { useEffect, useRef } from 'react';
import FroalaEditor from 'froala-editor';
import 'froala-editor/js/languages/zh_tw.js';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/js/plugins.pkgd.min.js';

export default function FroalaEditorWrapper({ onContentChange }) {
  const editorRef = useRef(null);

  useEffect(() => {
    let editorInstance = null;

    if (editorRef.current) {
      editorInstance = new FroalaEditor(editorRef.current, {
        language: 'zh_tw',
        toolbarButtons: ['bold', 'italic', 'underline', 'insertImage', 'insertLink', 'html'],
        pluginsEnabled: ['image', 'link', 'html'],
        events: {
          contentChanged: function () {
            const content = this.html.get();
            console.log("🔹 Froala 內容變更:", content);
            onContentChange(content); // ✅ 回傳內容給 `AddArticlePage`
          }
        },
      });
    }

    return () => {
      if (editorInstance) {
        editorInstance.destroy();
      }
    };
  }, [onContentChange]);

  return <div ref={editorRef}></div>;
}
