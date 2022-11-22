const User = require('./User');
const Post = require('./Post');
const Profile = require('./Profile');

User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
}),

User.hasOne(Profile, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
}),

Post.belongsTo(User, {
  foreignKey: 'user_id'
}),

Profile.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = { User, Post, Profile };