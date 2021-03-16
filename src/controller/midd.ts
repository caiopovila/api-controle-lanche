export const testAuth = (req, res, next) => {
    if (req.session.businessId == null || req.session.hash != req.query.id) {
        res.sendStatus(403);
    } else {
        next();
    }
};