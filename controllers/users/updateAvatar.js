const fs = require('fs/promises');
const path = require('path');
const Jimp = require('jimp');
const { NotFound } = require('http-errors');

const { User } = require('../../models');

const uploadDir = path.join(__dirname, '../../', 'public', 'avatars');

const updateAvatar = async (req, res, next) => {
  const { _id } = req.user;
  const { path: tempPath, originalname } = req.file;

  try {
    const [extension] = originalname.split('.').reverse();
    const avatarName = `${_id}.${extension}`;
    const avatarURL = path.join('/avatars', avatarName);
    const newPath = path.join(uploadDir, avatarName);

    await Jimp.read(tempPath)
      .then(image => image.resize(250, 250).quality(50).write(newPath))
      .catch(error => next(new NotFound(error.message)));

    await fs.unlink(tempPath);
    await User.findByIdAndUpdate(_id, { avatarURL });

    res.json({
      status: 'success',
      avatarURL,
    });
  } catch (error) {
    await fs.unlink(tempPath);
    next(error);
  }
};

module.exports = updateAvatar;
