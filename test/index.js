import chai from 'chai'

import './cnxml'
import './plugins'

global.should = chai.should()
chai.use(require('chai-immutable'))
