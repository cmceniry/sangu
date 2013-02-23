(ns sangu.server
  (:require
    [ring.adapter.jetty :as ring]
    [ring.middleware.resource :as resource]
    [ring.middleware.file-info :as file-info]
    [ring.middleware.stacktrace :as stacktrace]
    [sangu.util :as util]
  )
)

(defn myhandler [request]
  {
    :status 403
    :headers {"Content-Type" "text/html"}
    :body "Forbidden"
  }
)

(def app
  (-> myhandler
    (resource/wrap-resource "public")
    (file-info/wrap-file-info)
    (util/wrap-request-logging)
    (stacktrace/wrap-stacktrace)
  )
)

(defn -main [& args]
  (ring/run-jetty app {:port 3000})
)
