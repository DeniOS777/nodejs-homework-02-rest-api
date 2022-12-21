const fs = require('fs/promises');
const path = require('path');
const { User } = require('../../models');

const uplaodDir = path.join(__dirname, '../../', 'public', 'avatars');

const updateAvatar = async (req, res, next) => {
  const { _id } = req.user;
  const { path: tempPath, originalname } = req.file;

  try {
    const [extension] = originalname.split('.').reverse();
    const avatarName = `${_id}.${extension}`;
    const newPath = path.join(uplaodDir, avatarName);
    const avatarURL = path.join('/avatar', avatarName);
    console.log(avatarName);
    await fs.rename(tempPath, newPath);
    await User.findByIdAndUpdate(_id, avatarURL);

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
