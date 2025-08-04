package docs

import (
	"fmt"

	"github.com/pb33f/libopenapi"
)

// SwaggerInfoCartino holds exported Swagger Info so clients can modify it

func init() {
	document, err := libopenapi.NewDocument([]byte(docTemplateCartino))
	if err != nil {
		panic(fmt.Sprintf("cannot create new document: %e", err))
	}
	docV3, errBuild := document.BuildV3Model()
	if errBuild != nil {
		panic(fmt.Sprintf("cannot create new document: %e", errBuild))
	}
	sec := docV3.Model.Components.SecuritySchemes
	bearer, ok := sec.Get("bearerauth")
	if ok {
		bearer.Name = "احرازهویت-مشتری"
		bearer.Description = "بایستی توکن توسط سرویس احراز هویت مشتری تولید شود و در این قسمت درج گردد"
		sec.Set("احرازهویت-مشتری", bearer)
		sec.Delete("bearerauth")
		// log.Println(*sec)
		docV3.Model.Components.SecuritySchemes = sec
		docB, err := docV3.Model.Render()
		if err != nil {
			panic(fmt.Sprintf("cannot render model: %e", err))
		}
		SwaggerInfoCartino.SwaggerTemplate = string(docB)
	}
}
