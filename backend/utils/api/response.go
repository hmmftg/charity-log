package api

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// ErrorItem matches the requestCore error envelope expected by the Refine frontend.
type ErrorItem struct {
	Code        string `json:"code"`
	Description string `json:"description"`
}

// ListEnvelope is the standard list response shape for Refine dataProvider.
type ListEnvelope struct {
	Result any `json:"result"`
}

// WriteList writes a paginated list response with X-Total-Count.
func WriteList(c *gin.Context, items any, total int) {
	c.Header("X-Total-Count", itoa(total))
	c.JSON(http.StatusOK, ListEnvelope{Result: items})
}

// WriteOne writes a single-item response as result[0].
func WriteOne(c *gin.Context, item any) {
	c.JSON(http.StatusOK, ListEnvelope{Result: []any{item}})
}

// WriteDML writes a mutation response using the requestCore DML result shape.
func WriteDML(c *gin.Context, status int, result any) {
	c.JSON(status, gin.H{"result": result})
}

// WriteError writes a standardized error payload.
func WriteError(c *gin.Context, status int, code, description string) {
	if rid, ok := c.Get("request_id"); ok {
		if requestID, isString := rid.(string); isString && requestID != "" {
			description = description + " (request_id=" + requestID + ")"
		}
	}
	c.JSON(status, gin.H{
		"errors": []ErrorItem{{
			Code:        code,
			Description: description,
		}},
	})
}

func itoa(n int) string {
	if n == 0 {
		return "0"
	}
	negative := n < 0
	if negative {
		n = -n
	}
	var digits []byte
	for n > 0 {
		digits = append([]byte{byte('0' + n%10)}, digits...)
		n /= 10
	}
	if negative {
		digits = append([]byte{'-'}, digits...)
	}
	return string(digits)
}
