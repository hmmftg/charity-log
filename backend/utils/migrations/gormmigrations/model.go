package gormmigrations

import (
	"fmt"
	"time"
)

type AutoStart struct {
	ID         string `gorm:"primarykey"`
	Name       string
	ServerID   string
	Server     Server `gorm:"foreignKey:ServerID"`
	ScenarioID string
	Scenario   ScenarioGroup `gorm:"foreignKey:ScenarioID"`
}

func (a AutoStart) GetID() string {
	return a.ID
}

type Client struct {
	ID         string `gorm:"primarykey"`
	ServerID   string
	Server     Server `gorm:"foreignKey:ServerID"`
	TCPStateID string
	TCPState   TCPState `gorm:"foreignKey:TCPStateID"`
}

func (c Client) GetID() string {
	return c.ID
}

type Terminal struct {
	ID             string `gorm:"primarykey"`
	RemoteServerID string
	RemoteServer   RemoteServer `gorm:"foreignKey:RemoteServerID"`
	TCPStateID     string
	TCPState       TCPState `gorm:"foreignKey:TCPStateID"`
}

func (c Terminal) GetID() string {
	return c.ID
}

type ISOMessage struct {
	ID         string `gorm:"primarykey"`
	Name       string
	Fields     string
	FormatID   string
	Format     Format `gorm:"foreignKey:FormatID"`
	GroupID    string
	Group      ISOMessageGroup `gorm:"foreignKey:GroupID"`
	SubGroupID string
	SubGroup   ISOMessageSubGroup `gorm:"foreignKey:SubGroupID"`
}

func (i ISOMessage) GetID() string {
	return i.ID
}

type ISOMessageSubGroup struct {
	ID      string `gorm:"primarykey"`
	Name    string
	GroupID string
	Group   ISOMessageGroup `gorm:"foreignKey:GroupID"`
}

func (i ISOMessageSubGroup) GetID() string {
	return i.ID
}

type Message struct {
	ServerID    string    `gorm:"primarykey"`
	Server      Server    `gorm:"foreignKey:ServerID"`
	ClientID    string    `gorm:"primarykey"`
	Client      Client    `gorm:"foreignKey:ClientID"`
	DateTime    time.Time `gorm:"primarykey"`
	Direction   string    `gorm:"primarykey"`
	Description string    `gorm:"not null"`
	Status      string    `gorm:"not null"`
	FormatID    string
	Format      Format `gorm:"foreignKey:FormatID"`
	TestCaseID  string
	TestCase    ISOMessage `gorm:"foreignKey:TestCaseID"`
	Fields      string
}

type RemoteServer struct {
	ID       string `gorm:"primarykey"`
	Name     string `gorm:"not null"`
	FormatID string
	Format   Format `gorm:"foreignKey:FormatID"`
}

func (r RemoteServer) GetID() string {
	return r.ID
}

type Scenario struct {
	ID             string `gorm:"primarykey"`
	Name           string `gorm:"not null"`
	Mti            string
	ProcessingCode string
	Delay          string
	StopResponding string
	Field39        string
	Field44        string
	Field54        string
	Field115       string
	Field62        string
	Field124       string
	Field72        string
	Field102       string
	Field103       string
	GroupID        string
	Group          ScenarioGroup `gorm:"foreignKey:GroupID"`
}

func (s Scenario) GetID() string {
	return s.ID
}

type Server struct {
	ID         string `gorm:"primarykey"`
	Name       string `gorm:"not null"`
	PortID     int
	Port       Port `gorm:"foreignKey:PortID"`
	FormatID   string
	Format     Format `gorm:"foreignKey:FormatID"`
	TCPStateID string
	TCPState   TCPState `gorm:"foreignKey:TCPStateID"`
	SslEnabled string
}

func (s Server) GetID() string {
	return s.ID
}

type StressCard struct {
	ID      string `gorm:"primarykey"`
	GroupID string
	Group   GenerateCard `gorm:"foreignKey:GroupID"`
}

type StressISOMessage struct {
	ID       string `gorm:"primarykey"`
	Name     string `gorm:"not null"`
	FormatID string
	Format   Format `gorm:"foreignKey:FormatID"`
}

type StressScenario struct {
	ID           string  `gorm:"primarykey"`
	Name         string  `gorm:"not null"`
	Percent      float64 `gorm:"not null"`
	ISOMessageID string
	ISOMessage   StressISOMessage `gorm:"foreignKey:ISOMessageID"`
	GroupID      string
	Group        StressScenarioGroup `gorm:"foreignKey:GroupID"`
	SubGroupID   string
	SubGroup     StressScenarioSubGroup `gorm:"foreignKey:SubGroupID"`
}

type StressScenarioSubGroup struct {
	ID      string `gorm:"primarykey"`
	Name    string `gorm:"not null"`
	GroupID string
	Group   StressScenarioGroup `gorm:"foreignKey:GroupID"`
}

type Format struct {
	ID        string `gorm:"primarykey"`
	Name      string
	HasHeader string
}

func (f Format) GetID() string {
	return f.ID
}

type GenerateCard struct {
	ID         string    `gorm:"primarykey"`
	Count      int       `gorm:"not null"`
	RangeStart string    `gorm:"not null"`
	RangeEnd   string    `gorm:"not null"`
	Expiry     string    `gorm:"not null"`
	Pin1       string    `gorm:"not null"`
	Pin2       string    `gorm:"not null"`
	DateTime   time.Time `gorm:"not null"`
}

type ISOMessageGroup struct {
	ID   string `gorm:"primarykey"`
	Name string `gorm:"not null"`
}

func (i ISOMessageGroup) GetID() string {
	return i.ID
}

type Port struct {
	ID   int    `gorm:"primarykey"`
	Name string `gorm:"not null"`
}

func (f Port) GetID() string {
	return fmt.Sprintf("%d", f.ID)
}

type ScenarioGroup struct {
	ID   string `gorm:"primarykey"`
	Name string `gorm:"not null"`
}

func (s ScenarioGroup) GetID() string {
	return s.ID
}

type StressScenarioGroup struct {
	ID   string `gorm:"primarykey"`
	Name string `gorm:"not null"`
}

func (s StressScenarioGroup) GetID() string {
	return s.ID
}

type TCPState struct {
	ID   string `gorm:"primarykey"`
	Name string `gorm:"not null"`
}

func (t TCPState) GetID() string {
	return t.ID
}

type User struct {
	ID       string `gorm:"primarykey"`
	UserName string
	UserData string
	PersonID string
	Pass     string
}

func (t User) GetID() string {
	return t.ID
}
