package api

import (
	"log"

	"github.com/gin-gonic/gin"
)

const RequestIDHeader = "Request-Id"

// RequestIDMiddleware logs and propagates the Request-Id header for traceability.
func RequestIDMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		requestID := c.GetHeader(RequestIDHeader)
		if requestID == "" {
			requestID = c.GetHeader("X-Request-Id")
		}
		if requestID != "" {
			c.Set("request_id", requestID)
			c.Header(RequestIDHeader, requestID)
		}
		c.Next()
		if requestID != "" && c.Writer.Status() >= 400 {
			log.Printf("request_id=%s method=%s path=%s status=%d",
				requestID, c.Request.Method, c.Request.URL.Path, c.Writer.Status())
		}
	}
}
