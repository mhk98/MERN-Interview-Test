// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// // Line Schema
// const lineSchema = new Schema({
//   startX: Number,
//   startY: Number,
//   endX: Number,
//   endY: Number,
//   color: String,
//   width: Number
// }, { _id: false });

// // Shape Schema
// const shapeSchema = new Schema({
//   type: { type: String, enum: ['rectangle', 'circle'], required: true },
//   x: Number,
//   y: Number,
//   width: Number,
//   height: Number,
//   color: String
// }, { _id: false });

// // Text Schema
// const textSchema = new Schema({
//   content: String,
//   x: Number,
//   y: Number,
//   fontSize: Number,
//   color: String
// }, { _id: false });

// // Element Schema
// const elementSchema = new Schema({
//   type: { type: String, enum: ['line', 'shape', 'text'], required: true },
//   properties: {
//     line: { type: lineSchema, required: function() { return this.type === 'line'; } },
//     shape: { type: shapeSchema, required: function() { return this.type === 'shape'; } },
//     text: { type: textSchema, required: function() { return this.type === 'text'; } }
//   }
// }, { _id: false });

// // Drawing Schema
// const DrawingSchema = new Schema({
//   title: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now },
//   updatedAt: { type: Date, default: Date.now },
//   elements: [elementSchema]
// });

// // Create model
// const Drawing = mongoose.model('Drawing', DrawingSchema);

// module.exports = Drawing;


const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const drawingSchema = new Schema({
  title: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  elements: [
    {
      type: { type: String, enum: ['line', 'rectangle', 'circle', 'text'], required: true },
      data: Schema.Types.Mixed
    }
  ]
});

module.exports = mongoose.model('Drawing', drawingSchema);
