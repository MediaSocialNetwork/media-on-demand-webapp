import mongoose from 'infrastructure/mongoose'

const schema = mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    index: true
  },
  provider: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: true
  },
  domain: {
    type: String,
    required: true
  },
  settings: {
    type: String,
  },
  isDefault: {
    type: Boolean,
    default: false
  },
  removed: {
    type: Boolean,
    default: false,
    index: true
  }
})


export default mongoose.model('Infrastructure', schema)