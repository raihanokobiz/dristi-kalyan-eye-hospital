export async function resizeImage(
    file: File,
    maxWidth = 800,
    maxHeight = 800,
    quality = 0.8
): Promise<File> {
    const img = new Image()
    const reader = new FileReader()

    return new Promise((resolve, reject) => {
        reader.onload = () => (img.src = reader.result as string)
        reader.onerror = reject

        img.onload = () => {
            const scale = Math.min(
                maxWidth / img.width,
                maxHeight / img.height,
                1
            )

            const canvas = document.createElement("canvas")
            canvas.width = img.width * scale
            canvas.height = img.height * scale

            const ctx = canvas.getContext("2d")
            if (!ctx) return reject("Canvas not supported")

            ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

            canvas.toBlob(
                blob => {
                    if (!blob) return reject("Compression failed")
                    resolve(
                        new File([blob], file.name.replace(/\.\w+$/, ".jpg"), {
                            type: "image/jpeg",
                        })
                    )
                },
                "image/jpeg",
                quality
            )
        }

        reader.readAsDataURL(file)
    })
}
