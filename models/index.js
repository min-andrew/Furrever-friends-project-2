const User = require('./User');
const Post = require('./Post');
const Profile = require('./Profile');
const Comment = require('./Comment');

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

Post.hasMany(Comment, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id'
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id'
});

module.exports = { User, Post, Profile, Comment };