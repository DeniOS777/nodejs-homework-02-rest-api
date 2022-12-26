const { login } = require('../controllers/users');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const { Unauthorized } = require('http-errors');

const { User } = require('../models');

const { SECRET_KEY } = process.env;

describe('auth login test', () => {
  test('should create a token for current user', async () => {
    const user = {
      _id: '1',
      email: 'example@mail.com',
      password: '123456',
      subscription: 'starter',
    };

    const mReq = {
      body: {
        email: 'example@mail.com',
        password: '123456',
      },
    };

    jest.spyOn(User, 'findOne').mockImplementationOnce(() => user);

    const token = jwt.sign({ id: user._id }, SECRET_KEY);

    const mRes = {
      status: 200,
      token: token,
      user: {
        email: mReq.body.email,
        subscription: user.subscription,
      },
    };
    const mockNext = jest.fn();

    await login(mReq, mRes, mockNext);

    expect(mRes.status).toBe(200);
    expect(mRes.token).toBe(token);
    expect(mRes.user).toEqual({
      email: expect.any(String),
      subscription: expect.any(String),
    });
  });

  test('should call next() with error if user not found ', async () => {
    const mReq = {
      body: {
        email: 'example@mail.com',
        password: '123456',
      },
    };

    const mRes = {};

    jest.spyOn(User, 'findOne').mockImplementationOnce(() => null);

    const mockNext = jest.fn();
    await login(mReq, mRes, mockNext);

    expect(mockNext).toHaveBeenCalledWith(
      new Unauthorized('Email or password is wrong')
    );
  });
});
