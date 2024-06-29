import { classNames } from '@libreconnect/utils'
import { useCallback, useEffect, useState } from 'react'


export interface InputMultiFileProps {
  values: File[] | string[] | undefined;
  onChange?: (e: string[] | undefined | null) => void;
  className?: string;
  accept?: string;
  dataTestId?: string;
}

export async function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => {
      if (reader.result) {
        resolve(reader.result as string)
      }
    })

    reader.readAsDataURL(file)
  })
}

export function InputMultiFile(props: InputMultiFileProps) {
  const {
    values,
    className = '',
    onChange,
    accept = 'image/*',
    dataTestId = 'input-file',
  } = props

  const [selectedImages, setSelectedImages] = useState<
    (string  | Blob | MediaSource)[] | undefined
  >(values)
  const [fileInputKey, setFileInputKey] = useState(0)

  useEffect(() => {
    if (values) setSelectedImages(values)
  }, [values, setSelectedImages])

  const handleChange = useCallback(
    (event: { target: HTMLInputElement & EventTarget }) => {

      async function doFileRead() {
        if (event.target.files && event.target.files.length > 0) {
          const result = await readFileAsDataURL(event.target.files[0])
          setFileInputKey(fileInputKey + 1)
          const values = [...(selectedImages ?? []), result as string]

          setSelectedImages(values)
          onChange?.(values as string[])
        }
      }

      doFileRead()
    }, 
  [fileInputKey, onChange, selectedImages])

  const handleDelete = (index: number) => {
    setSelectedImages((selectedImages || []).filter((_, i) => i !== index))
  }
  
  

  return (
    <>
      {
        selectedImages && 
        <div className='flex pb-2 gap-2 max-h-40'>
          {(selectedImages || []).map((item, index) => 
            <div
              key={index}
              className="col-span-1 rounded-md border-2 border-gray-200 border-dashed hover:border-gray-300 hover:cursor-pointer overflow-hidden bg-white max-h-40 aspect-square"
              onClick={() => handleDelete(index)}
            >
              <img
                className="object-cover hover:opacity-70 rounded-lg w-full h-full"
                src={`${item}`}
                alt="item"
              />
            </div>
          )}
        </div >
      }
      <label
        data-testid={dataTestId}
        htmlFor={props.dataTestId}
        className={classNames(
          'relative flex items-center justify-center w-full group h-16 rounded bg-neutral-50 border border-neutral-300 ease-out duration-150 border-dashed cursor-pointer hover:bg-neutral-150',
          className
        )}
      >
         <input
          data-testid="input-file-field"
          id={props.dataTestId}
          type="file"
          key={fileInputKey}
          className="hidden"
          accept={accept}
          onChange={handleChange}
        />
        <svg
          className="relative"
          xmlns="http://www.w3.org/2000/svg"
          width="17"
          height="14"
          fill="none"
          viewBox="0 0 17 14"
        >
          <path
            fill="#A1A8CF"
            d="M14.969 0h-12c-1.094 0-2 .906-2 2v10c0 1.125.906 2 2 2h12c1.094 0 2-.875 2-2V2c0-1.094-.875-2-2-2zm-10.5 2c.812 0 1.5.688 1.5 1.5 0 .844-.657 1.5-1.5 1.5-.875 0-1.5-.656-1.5-1.5 0-.813.687-1.5 1.5-1.5zm10.468 9.75a.539.539 0 01-.437.25H3.562a.514.514 0 01-.468-.25c-.063-.188-.063-.375.062-.531l2.188-3A.488.488 0 015.75 8c.156 0 .281.094.375.219l1.031 1.406 2.907-4.375A.499.499 0 0110.5 5c.156 0 .313.094.406.25l4 6c.094.125.094.344.031.5z"
          />
        </svg>
      </label>
    </>
  )
}
