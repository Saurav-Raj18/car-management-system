const sendtoken = (user, statusCode, res) => {
    //tokrn generating
    const token = user.getjwttoken();

    //cookies
    const expiryDate = new Date();
    expiryDate.setTime(expiryDate.getTime() + 3 * 60 * 60 * 1000);

    const options = {
        expires: expiryDate,
        httpOnly: true,
    }

    res.status(statusCode).cookie('access_token', token, options)
        .json({
            sucess: true,
            token, user
        }
        )

}
module.exports = sendtoken