const mongoose= require('mongoose');

mongoose.connect('mongodb://localhost/playground')
.then(()=> console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MOngoDB...', err) );

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: {type: Date, default: Date.now },
    isPublished: Boolean
});

const Course = mongoose.model('Course',courseSchema);

async function createCourse(){
    
    const course = new Course({
    name: 'Angular',
    author: 'Murtoza',
    tags: ['Angular','frontend'],
    isPublished:true
});

const result = await course.save();
console.log(result);
}

async function getCourses(){
    // eq (equal)
    //ne (not equal)
    //gt (greater than)
    //gte (greater than or eqaul to)
    //lt (less than)
    //lte (less than or eqaul to)
    //in
    //nin (not in)

    // .find({price: { $gte : 10, $lte: 20}})
    // .find({price: { $in : [10,15,20]}})

    //.find().or([{author:'Murtoza'},{isPublished: true}])

    const courses = await Course
    .find({ author:'Murtoza', isPublished: true})
    .limit(10)
    .sort({name: 1})
    .select({name:1, tags:1});
    console.log(courses);
}
getCourses();

