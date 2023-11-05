const handleUpload = (event) => {
    const files = event.target.files;
    const fileData = [];

    for ( let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        const file=files[i];

        reader.onload = (e) => {
            const fileTitle = file.webkitRelativePath.split('/')[0];
            const filePath = e.target.result;

            fileData.push({ fileTitle, filePath });

            if (fileData.length === files.length) {
                //DO SOMETHING WITH DATA HERE?!?!?
                console.log(fileData);
            }
    }
    reader.readAsDataURL(file);
}
}



export default handleUpload