module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,

      /*    validate: {
        isEmail: {
          msg: "Must be a valid email address",
        },
      }, */
    },

    admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValues: false,
    },

    photo_profil: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValues: false,
    },
  });

  Users.associate = (models) => {
    //un user à plusieurs postes et plusieurs likes
    Users.hasMany(models.Likes, {
      onDelete: "cascade",
    });

    Users.hasMany(models.Posts, {
      onDelete: "cascade",
    });
  };

  return Users;
};
