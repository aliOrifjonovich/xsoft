import { ImageUp, PencilLine, Trash2 } from "lucide-react";
import React from "react";
import ImageUploading, { ImageListType } from "react-images-uploading";

interface ImageUploadProps {
  name: string;
  value: ImageListType;
  onChange: (imageList: ImageListType) => void;
}

const Imageuploades: React.FC<ImageUploadProps> = ({ value, onChange }) => {
  const maxNumber = 69;

  return (
    <div className="App">
      <ImageUploading
        multiple
        value={value}
        onChange={onChange}
        maxNumber={maxNumber}
      >
        {({
          imageList,
          onImageUpload,
          // onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          <div className="upload__image-wrapper">
            <button
              style={isDragging ? { color: "red" } : undefined}
              type="button"
              onClick={onImageUpload}
              {...dragProps}
              className="border border-solid w-full p-4 flex items justify-center rounded-md"
            >
              <ImageUp />
            </button>
            &nbsp;
            {/* <button onClick={onImageRemoveAll} type="button">
              Remove all images
            </button> */}
            <div
              className="grid gap-4"
              style={{
                gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
              }}
            >
              {imageList.map((image, index) => (
                <div
                  key={index}
                  className="image-item mt-4 flex flex-col gap-2 "
                >
                  <img
                    src={image.dataURL !== undefined ? image.dataURL : ""}
                    alt="Uploaded image"
                    width="100"
                  />
                  <div className="image-item__btn-wrapper flex gap-2">
                    <button
                      onClick={() => onImageUpdate(index)}
                      className="cursor-pointer"
                      type="button"
                    >
                      <PencilLine />
                    </button>
                    <button
                      onClick={() => onImageRemove(index)}
                      type="button"
                      className="cursor-pointer"
                    >
                      <Trash2 />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </ImageUploading>
    </div>
  );
};

export default Imageuploades;
