package handlers

import (
	"errors"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v4"
	"github.com/jestonikin/gotemplate/database"
	"github.com/jestonikin/gotemplate/models"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

// func CreateUser(c *fiber.Ctx) error {
// 	db := database.DB

// 	user := c.Locals("user").(models.User)

// 	if err := db.Create(&user).Error; err != nil {
// 		return c.Status(500).JSON(fiber.Map{"error": err.Error()})
// 	}

// 	return c.Status(201).JSON(user)
// }

func CreateHousehold(c *fiber.Ctx) error {
	db := database.DB

	household := c.Locals("household").(models.Household)

	if err := db.Create(&household).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}

	return c.Status(fiber.StatusCreated).JSON(household)
}

func CreateUser(c *fiber.Ctx) error {
	db := database.DB
	// user := models.User{}

	user := c.Locals("user").(models.User)

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), 14)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(err.Error())
	}

	user.Password = string(hashedPassword)

	db.Create(&user)

	return c.JSON(user)
}

func GetUsers(c *fiber.Ctx) error {
	db := database.DB

	users := []models.User{}

	db.Order("firstname").Find(&users)

	return c.JSON(users)
}

func Login(c *fiber.Ctx) error {
	db := database.DB

	type Input struct {
		Username string `json:"username"`
		Password string `json:"password"`
	}

	var input Input

	if err := c.BodyParser(&input); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(err.Error())
	}

	user := models.User{}

	err := db.Where("username = ?", input.Username).First(&user).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return errors.New("Invalid username")
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(input.Password)); err != nil {
		return errors.New("Invalid password")
	}

	token := jwt.New(jwt.SigningMethodHS256)

	claims := token.Claims.(jwt.MapClaims)
	claims["id"] = user.ID
	claims["username"] = user.Username
	claims["firstname"] = user.Firstname
	claims["lastname"] = user.Lastname

	t, _ := token.SignedString([]byte("#asscatMM23"))

	return c.JSON(fiber.Map{"token": t})
}

func GetHousehold(c *fiber.Ctx) error {
	db := database.DB

	users := []models.Household{}

	db.Order("id DESC").Find(&users)

	return c.JSON(users)
}
