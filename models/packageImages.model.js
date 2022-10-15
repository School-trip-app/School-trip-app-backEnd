"use strict";

function createPackageImagesTable (sequelize , DataTypes){
  return(
    sequelize.define("packageImages",{
      packageId : {type: DataTypes.INTEGER , allowNull : false },
      imageUrl : {type: DataTypes.STRING , allowNull : false  }
    })
  )
}
module.exports = {createPackageImagesTable};