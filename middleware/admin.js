const isAdminMiddleware =  (req, res) => {
    try {
        const authHeader = req.headers.authorization

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Authorization token missing' });
        }

        const accessToken = authHeader.split(' ')[1];
        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);

        if (decoded.role != 'ADMIN') {
            return res.status(403).json({ message: 'Access Denied: Admins Only' })
        }
        next()
    } catch (err) {
        console.log(err)
        res.status(400).json({ message: 'Invalid or expired token' })
    }
}

export { isAdminMiddleware }
