import Layout from "@/components/Layout";
import { useRef } from "react";

 function UploadScreen(params){
    const fileInputRef = useRef(null);
  
    const handleClick = () => {
      fileInputRef.current.click();
    };
  
    const handleFileChange = (e) => {
      const files = e.target.files;
      // Handle the selected files as needed (e.g., upload to server)
      console.log('Selected files:', files);
    };
  
    const handleDragOver = (e) => {
      e.preventDefault();
    };
  
    const handleDrop = (e) => {
      e.preventDefault();
  
      const files = e.dataTransfer.files;
      // Handle the dropped files as needed (e.g., upload to server)
      console.log('Dropped files:', files);
    };
  
    return (
    <Layout>
                  <div className="p-6 bg-black bg-opacity-70 ">
      <h1 className="text-3xl font-bold mb-4 text-center">Upload Your Video here</h1></div>
        <div
        className="border-dashed h-[550px] w-3/5 border-4 border-gray-300 p-4 mx-auto cursor-pointer align-middle items-center item text-center"
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
          multiple
        />
        <p className=" font-semibold text-2xl text-gray-600 my-auto ">Click or drag & drop files here</p>
      </div>
      </Layout>
    
    );
  };
  UploadScreen.auth=true;
  export default  UploadScreen;