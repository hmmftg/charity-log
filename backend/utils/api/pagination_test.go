package api

import "testing"

func TestSlicePage(t *testing.T) {
	items := []int{1, 2, 3, 4, 5}
	page := PageRange{Start: 1, End: 4}
	got := SlicePage(items, page)
	if len(got) != 3 {
		t.Fatalf("expected 3 items, got %d", len(got))
	}
	if got[0] != 2 || got[2] != 4 {
		t.Fatalf("unexpected slice contents: %v", got)
	}
}

func TestParsePageRangeDefaults(t *testing.T) {
	page := PageRange{Start: 0, End: 10}
	if page.Start != 0 || page.End != 10 {
		t.Fatalf("unexpected defaults: %+v", page)
	}
}
