'use strict'

import { create } from "domain";
import moment = require("moment");

const jwt = require('jsonwebtoken');
const momen = require('moment');
const config = require('../config/config');


function createToken (user) {
    const payload = {
        sub: user._id,
        iat: moment().unix(),
        exp: moment().add(14,'days').unix(),
    }
}

module.exports = createToken;