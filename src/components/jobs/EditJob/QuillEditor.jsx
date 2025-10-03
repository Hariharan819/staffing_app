
import React, { forwardRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// Wrap ReactQuill with forwardRef to avoid findDOMNode warning
const QuillEditor = forwardRef((props, ref) => {
  return <ReactQuill ref={ref} {...props} />;
});

export default QuillEditor;
