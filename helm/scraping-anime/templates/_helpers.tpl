{{/*
Expand the name of the chart.
*/}}
{{- define "scraping-anime.name" -}}
{{- .Chart.Name }}
{{- end }}

{{/*
Create a default fully qualified app name.
*/}}
{{- define "scraping-anime.fullname" -}}
{{- .Release.Name }}-{{ .Chart.Name }}
{{- end }}

{{/*
Common labels
*/}}
{{- define "scraping-anime.labels" -}}
helm.sh/chart: {{ .Chart.Name }}-{{ .Chart.Version }}
app.kubernetes.io/name: {{ include "scraping-anime.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
app.kubernetes.io/version: {{ .Chart.AppVersion }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{/*
Selector labels
*/}}
{{- define "scraping-anime.selectorLabels" -}}
app.kubernetes.io/name: {{ include "scraping-anime.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}
