module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
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
