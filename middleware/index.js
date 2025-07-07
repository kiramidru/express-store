import admin from 'firebase-admin'

admin.initializeApp({
  credential: admin.credential.applicationDefault()
});

async function authenticateFirebaseToken(req, res, next) {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' })
  }

  const idToken = authHeader.split('Bearer ')[1]

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken
    next()
  } catch (error) {
    return res.status(403).json({ message: 'Unauthorized', error: error.message })
  }
}

export default authenticateFirebaseToken
