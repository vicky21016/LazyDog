'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { CKEditor, useCKEditorCloud } from '@ckeditor/ckeditor5-react'
import 'bootstrap/dist/css/bootstrap.min.css'
// import styles from './page.module.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './App.css';

const LICENSE_KEY =
  'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NDA0NDE1OTksImp0aSI6IjVkZTBlOGM4LWZlYmItNGIzMS1hMTEyLTU0Yzc4N2Q3ODBlMCIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiLCJzaCJdLCJ3aGl0ZUxhYmVsIjp0cnVlLCJsaWNlbnNlVHlwZSI6InRyaWFsIiwiZmVhdHVyZXMiOlsiKiJdLCJ2YyI6IjYzMzJjZDA4In0.KIrGThum_5EnwEo0iAMy8XHXsNmLKHgX5iUgXow2CcJYYtxlV0B-fKEhMOA2rbPXSIL-DWiepHLByC5XoqQJhQ'

const CLOUD_SERVICES_TOKEN_URL =
  'https://lvbp5spmsg_j.cke-cs.com/token/dev/7678421035748de5f4d7cb5ce7e8990f29e080df40238815f29ed1dd63df?limit=10'

export default function AddArticlePage() {
  const [selectedValue, setSelectedValue] = useState('')
  const editorContainerRef = useRef(null)
  const editorRef = useRef(null)
  const [isLayoutReady, setIsLayoutReady] = useState(false)
  const cloud = useCKEditorCloud({
    version: '44.1.0',
    ckbox: { version: '2.6.1' },
  })

  useEffect(() => {
    setIsLayoutReady(true)

    return () => setIsLayoutReady(false)
  }, [])

  const { InlineEditor, editorConfig } = useMemo(() => {
    if (cloud.status !== 'success' || !isLayoutReady) {
      return {}
    }

    const {
      InlineEditor,
      Autoformat,
      AutoImage,
      Autosave,
      BlockQuote,
      Bold,
      CKBox,
      CKBoxImageEdit,
      CloudServices,
      Essentials,
      Heading,
      ImageBlock,
      ImageCaption,
      ImageInline,
      ImageInsert,
      ImageInsertViaUrl,
      ImageResize,
      ImageStyle,
      ImageTextAlternative,
      ImageToolbar,
      ImageUpload,
      Indent,
      IndentBlock,
      Italic,
      Link,
      LinkImage,
      List,
      ListProperties,
      MediaEmbed,
      Paragraph,
      PasteFromOffice,
      PictureEditing,
      Table,
      TableCaption,
      TableCellProperties,
      TableColumnResize,
      TableProperties,
      TableToolbar,
      TextTransformation,
      TodoList,
      Underline,
    } = cloud.CKEditor

    return {
      InlineEditor,
      editorConfig: {
        toolbar: {
          items: [
            'heading',
            '|',
            'bold',
            'italic',
            'underline',
            '|',
            'link',
            'insertImage',
            'ckbox',
            'mediaEmbed',
            'insertTable',
            'blockQuote',
            '|',
            'bulletedList',
            'numberedList',
            'todoList',
            'outdent',
            'indent',
          ],
          shouldNotGroupWhenFull: false,
        },
        plugins: [
          Autoformat,
          AutoImage,
          Autosave,
          BlockQuote,
          Bold,
          CKBox,
          CKBoxImageEdit,
          CloudServices,
          Essentials,
          Heading,
          ImageBlock,
          ImageCaption,
          ImageInline,
          ImageInsert,
          ImageInsertViaUrl,
          ImageResize,
          ImageStyle,
          ImageTextAlternative,
          ImageToolbar,
          ImageUpload,
          Indent,
          IndentBlock,
          Italic,
          Link,
          LinkImage,
          List,
          ListProperties,
          MediaEmbed,
          Paragraph,
          PasteFromOffice,
          PictureEditing,
          Table,
          TableCaption,
          TableCellProperties,
          TableColumnResize,
          TableProperties,
          TableToolbar,
          TextTransformation,
          TodoList,
          Underline,
        ],
        cloudServices: {
          tokenUrl: CLOUD_SERVICES_TOKEN_URL,
        },
        heading: {
          options: [
            {
              model: 'paragraph',
              title: 'Paragraph',
              class: 'ck-heading_paragraph',
            },
            {
              model: 'heading1',
              view: 'h1',
              title: 'Heading 1',
              class: 'ck-heading_heading1',
            },
            {
              model: 'heading2',
              view: 'h2',
              title: 'Heading 2',
              class: 'ck-heading_heading2',
            },
            {
              model: 'heading3',
              view: 'h3',
              title: 'Heading 3',
              class: 'ck-heading_heading3',
            },
            {
              model: 'heading4',
              view: 'h4',
              title: 'Heading 4',
              class: 'ck-heading_heading4',
            },
            {
              model: 'heading5',
              view: 'h5',
              title: 'Heading 5',
              class: 'ck-heading_heading5',
            },
            {
              model: 'heading6',
              view: 'h6',
              title: 'Heading 6',
              class: 'ck-heading_heading6',
            },
          ],
        },
        image: {
          toolbar: [
            'toggleImageCaption',
            'imageTextAlternative',
            '|',
            'imageStyle:inline',
            'imageStyle:wrapText',
            'imageStyle:breakText',
            '|',
            'resizeImage',
            '|',
            'ckboxImageEdit',
          ],
        },
        // initialData:'請輸入內容',
        licenseKey: LICENSE_KEY,
        link: {
          addTargetToExternalLinks: true,
          defaultProtocol: 'https://',
          decorators: {
            toggleDownloadable: {
              mode: 'manual',
              label: 'Downloadable',
              attributes: {
                download: 'file',
              },
            },
          },
        },
        list: {
          properties: {
            styles: true,
            startIndex: true,
            reversed: true,
          },
        },
        placeholder: 'Type or paste your content here!',
        table: {
          contentToolbar: [
            'tableColumn',
            'tableRow',
            'mergeTableCells',
            'tableProperties',
            'tableCellProperties',
          ],
        },
      },
    }
  }, [cloud, isLayoutReady])

  useEffect(() => {
    if (editorConfig) {
      configUpdateAlert(editorConfig)
    }
  }, [editorConfig])
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-sm-12">
            <button className="btn btn-primary mb-3">返回</button>
          </div>
          <div className="col-lg-9">
            <form
              action=""
              className="p-3 col"
              style={{ maxWidth: '750px',backgroundColor: '#FFF6E8',boxShadow:"0px 10px 14px rgba(0, 0, 0, 0.25)" }}
            >
              <h4>新增文章</h4>
              <select
                className="form-select my-3"
                value={selectedValue}
                style={{ width: '154px' }}
                onChange={(e) => setSelectedValue(e.target.value)}
              >
                <option selected>請選擇主題</option>
                <option value="1">保健與營養</option>
                <option value="2">行為知識</option>
                <option value="3">開箱</option>
                <option value="4">食譜</option>
                <option value="5">善終</option>
              </select>
              <input
                className="mb-5 ps-2 w-100 d-block"
                placeholder="標題"
                type="text"
              />
              <div
                className="editor-container editor-container_inline-editor w-100"
                ref={editorContainerRef}
                style={{height:"500px"}}
              >
                <div className="editor-container__editor w-100" style={{height:"500px"}}>
                  <div ref={editorRef}>
                    {InlineEditor && editorConfig && (
                      <CKEditor editor={InlineEditor} config={editorConfig} />
                    )}
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-end">
              <button
                className="mt-3 "
                style={{
                  border: 'none',
                  backgroundColor: '#FFBD00',
                  color: 'white',
                  borderRadius: '5px',
                }}
              >
                <i className="bi bi-check-circle"></i> 發布文章
              </button>
            </div>
            </form>
            
          </div>
        </div>
      </div>
    </>
  );
};

function configUpdateAlert(config) {
	if (configUpdateAlert.configUpdateAlertShown) {
		return;
	}

	const isModifiedByUser = (currentValue, forbiddenValue) => {
		if (currentValue === forbiddenValue) {
			return false;
		}

		if (currentValue === undefined) {
			return false;
		}

		return true;
	};

	const valuesToUpdate = [];

	configUpdateAlert.configUpdateAlertShown = true;

	if (!isModifiedByUser(config.cloudServices?.tokenUrl, '<YOUR_CLOUD_SERVICES_TOKEN_URL>')) {
		valuesToUpdate.push('CLOUD_SERVICES_TOKEN_URL');
	}

	if (valuesToUpdate.length) {
		window.alert(
			[
				'Please update the following values in your editor config',
				'to receive full access to Premium Features:',
				'',
				...valuesToUpdate.map(value => ` - ${value}`)
			].join('\n')
		);
	}
}
