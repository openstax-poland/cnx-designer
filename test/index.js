import fs from 'fs'
import path from 'path'
import chai from 'chai'

global.should = chai.should()
chai.use(require('chai-immutable'))

import './cnxml'
import './plugins'
