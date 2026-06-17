package api

import (
	"strconv"

	"github.com/gin-gonic/gin"
)

// PageRange holds Refine-style _start/_end pagination values.
type PageRange struct {
	Start int
	End   int
}

// ParsePageRange reads _start and _end query params used by the Refine data provider.
func ParsePageRange(c *gin.Context) PageRange {
	start, _ := strconv.Atoi(c.DefaultQuery("_start", "0"))
	end, _ := strconv.Atoi(c.DefaultQuery("_end", "10"))
	if end < start {
		end = start + 10
	}
	return PageRange{Start: start, End: end}
}

// SlicePage applies start/end pagination to an in-memory slice.
func SlicePage[T any](items []T, page PageRange) []T {
	if page.Start >= len(items) {
		return []T{}
	}
	end := page.End
	if end > len(items) {
		end = len(items)
	}
	if end <= page.Start {
		return []T{}
	}
	return items[page.Start:end]
}
