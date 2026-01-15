package models

import (
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Username  string `json:"username"`
	Password  string `json:"password"`
	Firstname string `json:"firstname"`
	Lastname  string `json:"lastname"`
}

type HouseholdStatus struct {
	gorm.Model
	HouseholdID                 uint `json:"household_id"`
	Rent                        bool `json:"rent"`
	LivingWithParentsOrRelative bool `json:"livingWithParentsOrRelative"`
	Owned                       bool `json:"owned"`
	Others                      bool `json:"others"`
}

func (HouseholdStatus) TableName() string {
	return "tbl_household_status"
}

type Household struct {
	gorm.Model
	FatherName       string           `json:"father_name"`
	MotherName       string           `json:"mother_name"`
	FatherOccupation string           `json:"father_occupation"`
	MotherOccupation string           `json:"mother_occupation"`
	HomeAddress      string           `json:"home_address"`
	FamilyIncome     string           `json:"family_income"`
	HouseStatus      *HouseholdStatus `json:"houseStatus" gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
}
