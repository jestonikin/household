package routes

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/jestonikin/gotemplate/handlers"
	"github.com/jestonikin/gotemplate/models"
)

func UserRoutes(app *fiber.App) {
	api := app.Group("v1/api", logger.New())

	api.Post("/users", ParseBody[models.User]("user"), handlers.CreateUser)
	api.Post("/household", ParseBody[models.Household]("household"), handlers.CreateHousehold)
	api.Get("/households", handlers.GetHousehold)
	api.Get("/users", handlers.GetUsers)
	api.Post("/users/auth", handlers.Login)
}
