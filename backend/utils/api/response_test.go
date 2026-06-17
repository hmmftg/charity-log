package api

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
)

func TestWriteListSetsTotalHeader(t *testing.T) {
	gin.SetMode(gin.TestMode)
	w := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(w)

	WriteList(c, []string{"a", "b"}, 2)

	if w.Code != http.StatusOK {
		t.Fatalf("expected 200, got %d", w.Code)
	}
	if w.Header().Get("X-Total-Count") != "2" {
		t.Fatalf("expected X-Total-Count=2, got %q", w.Header().Get("X-Total-Count"))
	}

	var body ListEnvelope
	if err := json.Unmarshal(w.Body.Bytes(), &body); err != nil {
		t.Fatalf("invalid json: %v", err)
	}
}

func TestWriteErrorIncludesRequestID(t *testing.T) {
	gin.SetMode(gin.TestMode)
	w := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(w)
	c.Set("request_id", "req-test-123")

	WriteError(c, http.StatusBadRequest, "INVALID_REQUEST", "bad input")

	var payload struct {
		Errors []ErrorItem `json:"errors"`
	}
	if err := json.Unmarshal(w.Body.Bytes(), &payload); err != nil {
		t.Fatalf("invalid json: %v", err)
	}
	if len(payload.Errors) != 1 {
		t.Fatalf("expected one error, got %d", len(payload.Errors))
	}
	if payload.Errors[0].Description == "" || payload.Errors[0].Code != "INVALID_REQUEST" {
		t.Fatalf("unexpected error payload: %+v", payload.Errors[0])
	}
}
