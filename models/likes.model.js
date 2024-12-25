"use strict";

module.exports = (sequelize, DataTypes) => {
  const Reaction = sequelize.define(
    "reaction",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      reactionType: {
        type: DataTypes.ENUM("like", "dislike"),
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
        allowNull: false,
      },
      memoryId: {
        type: DataTypes.INTEGER,
        references: {
          model: "memories",
          key: "id",
        },
        allowNull: false,
      },
    },
    {
      indexes: [
        {
          unique: true,
          fields: ["userId", "memoryId"], // Ensures each user can react only once per memory
        },
      ],
    }
  );

//   Reaction.associate = (models) => {
//     // Set up the foreign key relationship to User
//     Reaction.belongsTo(models.user, { foreignKey: "userId", as: "user" });
//     // Set up the foreign key relationship to Memories
//     Reaction.belongsTo(models.memories, { foreignKey: "memoryId", as: "memory" });
//   };

  return Reaction;
};


// Reaction.belongsTo(models.user, { foreignKey: "userId", as: "user" });
