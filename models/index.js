const User = require('./User');
const Content = require('./Content');
const Profile = require('./Profile');

User.hasMany(Content, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
}),

User.hasOne(Profile, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
}),

Content.belongsTo(User, {
  foreignKey: 'user_id'
}),

Profile.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = { User, Content, Profile };
