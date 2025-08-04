package gormmigrations

import (
	"gorm.io/gorm"
)

func CreateTables(db *gorm.DB) error {
	err := db.AutoMigrate(
		&AutoStart{},
		&Client{},
		&Format{},
		&GenerateCard{},
		&ISOMessage{},
		&ISOMessageGroup{},
		&ISOMessageSubGroup{},
		&Message{},
		&Port{},
		&RemoteServer{},
		&Terminal{},
		&Scenario{},
		&ScenarioGroup{},
		&Server{},
		&StressCard{},
		&StressISOMessage{},
		&StressScenario{},
		&StressScenarioGroup{},
		&StressScenarioSubGroup{},
		&TCPState{},
		&User{},
	)
	if err != nil {
		return err
	}
	return nil
}
