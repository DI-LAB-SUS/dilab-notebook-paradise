import {useState, ChangeEvent} from 'react';
import {Container, Box, TextField, Button, Typography, Alert} from '@mui/material';
import {motion} from 'framer-motion';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import {useIframeStore} from "../stores/iframe-store.ts";

// Common style for upload areas
const uploadBoxStyle = {
    border: '2px dashed #ccc',
    borderRadius: 2,
    p: 2,
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'border-color 0.3s',
    '&:hover': {borderColor: 'primary.main'},
};

const UploadRoute = () => {
    const [file, setFile] = useState<File | null>(null);
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [desc, setDesc] = useState<string>('');
    const [alert, setAlert] = useState('');
    const [isSuccess, setIsSuccess] = useState<boolean | null>(null);

    const {setIFrameOpts} = useIframeStore();

    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleDescChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length <= 100) {
            setDesc(e.target.value);
        }
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const selectedImage = e.target.files[0];
            setImage(selectedImage);
            setImagePreview(URL.createObjectURL(selectedImage));
        }
    };

    const uploadFile = async () => {
        if (!file) {
            setAlert('請上傳檔案。');
            return;
        }
        if (title.length <= 0 || desc.length <= 0) {
            setAlert('請填完標題與描述。');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        if (image) {
            formData.append('image', image);
        }
        formData.append('title', title);
        formData.append('desc', desc);

        try {
            const response = await fetch(`/api/upload/webpage-note`, {
                method: 'POST',
                body: formData,
                credentials: 'include',
            });

            const result = await response.json();

            setIsSuccess(response.status == 200);
            setAlert(result.message);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <motion.div
            initial={{opacity: 0, y: 50}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0}}
            transition={{duration: 0.5}}
        >
            <Container maxWidth="sm" sx={{mt: 8}}>
                {
                    isSuccess != null && (
                        <Alert variant="filled" severity={isSuccess ? "success" : "error"}>
                            {alert}
                        </Alert>
                    )
                }
                <Typography variant="h4" component="h1" gutterBottom align="center">
                    上傳壓縮筆記
                </Typography>
                <Box position="relative" display="flex" justifyContent="flex-end" alignItems="center" width="100%" className={'mb-2'}>
                    {/* Centered Typography (Absolute Positioning) */}
                    <Typography sx={{position: "absolute", left: "50%", transform: "translateX(-50%)"}}
                                className={'text-gray-400'}>
                        *目前僅限定上傳 HTML, CSS, JS 網站*
                    </Typography>

                    {/* Right-Aligned Typography */}
                    <Typography className={'text-blue-300 font-bold shadow-2xl cursor-pointer'}
                    onClick={() => {
                        setIFrameOpts({
                            open: true,
                            url: '/api/upload/default-sites/upload-webpage-tut'
                        })
                    }}>
                        <HelpOutlineIcon className={'align-bottom'} />上傳教學
                    </Typography>
                </Box>
                <Box
                    component="form"
                    noValidate
                    autoComplete="off"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                    }}
                >
                    <TextField
                        label="筆記標題"
                        variant="outlined"
                        value={title}
                        onChange={handleTitleChange}
                        fullWidth
                        required
                    />
                    <TextField
                        label="筆記描述（限定100字）"
                        variant="outlined"
                        value={desc}
                        onChange={handleDescChange}
                        fullWidth
                        required
                        multiline
                        rows={5}
                    />
                    <Box component="label" sx={uploadBoxStyle}>
                        {file ? (
                            <Typography variant="subtitle1">已選擇檔案: {file.name}</Typography>
                        ) : (
                            <Typography variant="subtitle1" color="textSecondary">
                                點擊此區域上傳檔案 (.zip)
                            </Typography>
                        )}
                        <input type="file" hidden accept=".zip" onChange={handleFileChange}/>
                    </Box>

                    <Box
                        component="label"
                        sx={uploadBoxStyle}
                    >
                        {imagePreview ? (
                            <img
                                src={imagePreview}
                                alt="預覽圖片"
                                style={{width: '100%', maxHeight: '300px', objectFit: 'contain'}}
                            />
                        ) : (
                            <Typography variant="subtitle1" color="textSecondary">
                                點擊此區域上傳筆記縮圖 (可不選)
                            </Typography>
                        )}
                        <input type="file" hidden accept="image/*" onChange={handleImageChange}/>
                    </Box>

                    <Button variant="contained" color="secondary" onClick={uploadFile}>
                        上傳
                    </Button>
                </Box>
            </Container>
        </motion.div>
    );
};

export default UploadRoute;
