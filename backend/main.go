package main

import (
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/jestonikin/gotemplate/database"
	"github.com/jestonikin/gotemplate/routes"
	"github.com/joho/godotenv"
)

func main() {
	app := fiber.New()

	if err := godotenv.Load(); err != nil {
		log.Fatal("Error loading .env file")
	}

	base := os.Getenv("DEPLOYMENT")
	origin := os.Getenv("ALLOWED_ORIGIN")

	app.Use(cors.New(cors.Config{
		AllowOrigins: origin,
		AllowHeaders: "Origin, Content-Type, Accept",
		AllowMethods: "GET, POST, HEAD, PUT, DELETE, PATCH",
	}))

	database.ConnectDB()
	routes.UserRoutes(app)

	log.Fatal(app.Listen(base))
}
