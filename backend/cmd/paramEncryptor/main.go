package main

import (
	"flag"
	"healthcare/models"
	"log"
	"os"

	"github.com/hmmftg/requestCore/libParams"
	_ "github.com/lib/pq"
	_ "github.com/sijms/go-ora/v2"
)

func main() {
	paramFile := flag.String("p", "param.yaml", "Application Params")
	encryptParams := flag.Bool("c", false, "Encrypt Params")

	flag.Parse()

	wsParams, err := libParams.Load[models.ApplicationParams](*paramFile)
	if err != nil {
		log.Fatal(err.Error())
	}
	keys := [][]byte{
		{0xeb, 0xb2, 0x25, 0xcc, 0xe7, 0xfb, 0xa1, 0x5e, 0x32, 0xc6, 0xbb, 0xd0, 0xfd, 0x92, 0x05, 0x21},
		{0x4b, 0xdb, 0x3f, 0x59, 0xe9, 0x53, 0xb1, 0x16, 0xf2, 0x4d, 0xb0, 0xbe, 0xed, 0xcc, 0x12, 0x1d},
	}

	if *encryptParams {
		err = libParams.EncryptParams(keys[0], keys[1], *paramFile, wsParams)
		if err != nil {
			log.Fatalln("error in EncryptParams", err)
		}
		os.Exit(0)
	}
}
