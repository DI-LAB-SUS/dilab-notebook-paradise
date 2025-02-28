import {useState, ChangeEvent} from 'react';
import {Container, Box, TextField, Button, Typography, Alert} from '@mui/material';
import {motion} from 'framer-motion';

const UploadRoute = () => {
    const [file, setFile] = useState<File | null>(null);
    const [title, setTitle] = useState<string>('');
    const [desc, setDesc] = useState<string>('');
    const [alert, setAlert] = useState('');

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

        try {
            const response = await fetch(`/users/upload`, {
                method: 'POST',
                body: formData,
            });
            const result = await response.json();
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
                    alert.length > 0 && (
                        <Alert variant="filled" severity="error">
                            {alert}
                        </Alert>
                    )
                }
                <Typography variant="h4" component="h1" gutterBottom align="center">
                    上傳壓縮筆記
                </Typography>
                <Typography component="h6" gutterBottom align="center" className={'text-gray-400'}>
                    *目前僅限定上傳 HTML, CSS, JS 網站*
                </Typography>
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
                        rows={4}
                    />
                    <Button variant="contained" color="primary" component="label">
                        {file ? `已選擇檔案: ${file.name}` : '請選擇檔案 (.zip)'}
                        <input
                            type="file"
                            hidden
                            accept=".zip"
                            onChange={handleFileChange}
                        />
                    </Button>
                    <Button variant="contained" color="secondary" onClick={uploadFile}>
                        上傳
                    </Button>
                </Box>
            </Container>
        </motion.div>
    );
};

export default UploadRoute;
