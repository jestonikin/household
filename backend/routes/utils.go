package routes

import (
	"github.com/gofiber/fiber/v2"
)

func ParseBody[T any](key string) fiber.Handler {
	return func(c *fiber.Ctx) error {
		var body T
		if err := c.BodyParser(&body); err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(err.Error())
		}
		c.Locals(key, body)
		return c.Next()
	}
}
