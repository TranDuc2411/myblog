const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../src/resource/blog_img'));
    },
    filename: (req, file, cb) => {
        const originalExtension = path.extname(file.originalname).toLowerCase();
        cb(null, file.fieldname + '-' + Date.now() + originalExtension);
    }
});

const upload = multer({ storage: storage });

exports.UpdateMiddlerWare = (parameters) => {
    return (req, res, next) => {
        upload.single(parameters)(req, res, (err) => {
            if (err) {
                console.log("Error uploading file: ", err);
                return res.status(500).json({ status: 500, mess: "Error uploading file." });
            }
            // console.log(req.body)

            // Kiểm tra nếu không có file được tải lên
            if (!req.file) {
                console.log("No file uploaded.");
                next();
            } else {

                console.log(req.file.fieldname);
                const fieldname = req.file.fieldname;
                req.body = {
                    ...req.body,
                    [fieldname]: "/static/blog_img/" + req.file.filename
                };
                console.log("Middleware: ", req.body);
                next();
            }

        });
    };
}