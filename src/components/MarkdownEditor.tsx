'use client';
import dynamic from "next/dynamic";
import "react-markdown-editor-lite/lib/index.css";
import { useRef} from "react";
import { Skeleton } from "./ui/skeleton";
import { Button } from "@/components/ui/button";
import { createPost } from "@/lib/action";
import Markdown from 'react-markdown'
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import ReactMarkdown from 'react-markdown';

function onImageUpload(file: Blob) {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = data => {
      if (data.target) {
        resolve(data.target.result);
      }
    };
    reader.readAsDataURL(file);
  });
}

const MdEditor = dynamic(() => import("react-markdown-editor-lite"), {
  ssr: false, loading: () => <Skeleton className="w-[100%] mx-auto h-[75vh]" />
});


export default function MarkdownEditor() {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <>
      <form action={async (data) => {
        await createPost(data);
        formRef.current?.reset();
      }} ref={formRef}>
        <div className="mb-4 mx-auto">
          <input type="text" id="title" name="title" required placeholder="Title" className="block mx-auto w-[20rem] p-2 rounded-md placeholder:text-center dark:text-black bg-gray-200" />
        </div>
        <MdEditor
          style={{ height: "75vh" }}
          renderHTML={(content) => <Markdown rehypePlugins={[rehypeHighlight]} remarkPlugins={[remarkGfm]}>{content}</Markdown>}
          onImageUpload={onImageUpload}
          name="content"
          id="content"
        />
        <Button className="block mt-2 mx-auto">Post</Button>
      </form>
    </>
  );
}


// import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import ReactMarkdown from 'react-markdown';
// import MdEditor, { Plugins } from 'react-markdown-editor-lite';

// const PLUGINS = undefined;
// // const PLUGINS = ['header', 'divider', 'image', 'divider', 'font-bold', 'full-screen'];

// // MdEditor.use(Plugins.AutoResize, {
// //   min: 200,
// //   max: 800
// // });

// MdEditor.use(Plugins.TabInsert, {
//   tabMapValue: 1, // note that 1 means a '\t' instead of ' '.
// });

// interface DemoState {
//   value: string | null;
// }

// class Demo extends React.Component<{}, DemoState> {
//   mdEditor: MdEditor | undefined = undefined;

//   constructor(props: {}) {
//     super(props);
//     this.renderHTML = this.renderHTML.bind(this);
//     this.state = {
//       value: "# Hello",
//     };
//   }

//   handleEditorChange = (it: { text: any; }, event: any) => {
//     // console.log('handleEditorChange', it.text, it.html, event);
//     this.setState({
//       value: it.text,
//     });
//   };

//   handleImageUpload = (file: Blob) => {
//     return new Promise(resolve => {
//       const reader = new FileReader();
//       reader.onload = data => {
//         if (data.target) {
//           resolve(data.target.result);
//         }
//       };
//       reader.readAsDataURL(file);
//     });
//   };

//   onCustomImageUpload = (event: any) => {
//     console.log('onCustomImageUpload', event);
//     return new Promise((resolve, reject) => {
//       const result = window.prompt('Please enter image url here...');
//       resolve({ url: result });
//       // custom confirm message pseudo code
//       // YourCustomDialog.open(() => {
//       //   setTimeout(() => {
//       //     // setTimeout 模拟oss异步上传图片
//       //     // 当oss异步上传获取图片地址后，执行calback回调（参数为imageUrl字符串），即可将图片地址写入markdown
//       //     const url = 'https://avatars0.githubusercontent.com/u/21263805?s=80&v=4'
//       //     resolve({url: url, name: 'pic'})
//       //   }, 1000)
//       // })
//     });
//   };

//   handleGetMdValue = () => {
//     if (this.mdEditor) {
//       alert(this.mdEditor.getMdValue());
//     }
//   };

//   handleGetHtmlValue = () => {
//     if (this.mdEditor) {
//       alert(this.mdEditor.getHtmlValue());
//     }
//   };

//   handleSetValue = () => {
//     const text = window.prompt('Content');
//     this.setState({
//       value: text,
//     });
//   };

//   renderHTML(text: any) {
//     return React.createElement(ReactMarkdown, {}, text);
//   }

//   render() {
//     return (
//       <div className="demo-wrap">
//         <h3>react-markdown-editor-lite demo</h3>
//         <nav className="nav">
//           <button onClick={this.handleGetMdValue}>getMdValue</button>
//           <button onClick={this.handleGetHtmlValue}>getHtmlValue</button>
//           <button onClick={this.handleSetValue}>setValue</button>
//         </nav>
//         <div className="editor-wrap" style={{ marginTop: '30px' }}>
//           <MdEditor
//             ref={node => { this.mdEditor = node || undefined; }}
//             value={this.state.value || ''}
//             style={{ height: '500px', width: '100%' }}
//             renderHTML={this.renderHTML}
//             plugins={PLUGINS}
//             config={{
//               view: {
//                 menu: true,
//                 md: true,
//                 html: true,
//                 fullScreen: true,
//                 hideMenu: true,
//               },
//               table: {
//                 maxRow: 5,
//                 maxCol: 6,
//               },
//               imageUrl: 'https://octodex.github.com/images/minion.png',
//               syncScrollMode: ['leftFollowRight', 'rightFollowLeft'],
//             }}
//             onChange={this.handleEditorChange}
//             onImageUpload={this.handleImageUpload}
//             onFocus={e => console.log('focus', e)}
//             onBlur={e => console.log('blur', e)}
//             // onCustomImageUpload={this.onCustomImageUpload}
//           />
//           <MdEditor
//             style={{ height: '500px', width: '100%' }}
//             renderHTML={this.renderHTML}
//           />
//         </div>
//         {/* <div style={{marginTop: '30px'}}>
//           <MdEditor
//             value={MOCK_DATA}
//             style={{height: '200px', width: '100%'}}
//             config={{
//               view: {
//                 menu: true,
//                 md: true,
//                 html: true
//               },
//               imageUrl: 'https://octodex.github.com/images/minion.png'
//             }}
//             onChange={this.handleEditorChange} 
//           />  
//         </div> */}
//       </div>
//     );
//   }
// }
