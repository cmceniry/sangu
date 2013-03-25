(ns sangu.server
  (:require
    [ring.adapter.jetty :as ring]
    [ring.middleware.resource :as resource]
    [ring.middleware.file-info :as file-info]
    [ring.middleware.stacktrace :as stacktrace]
    [ring.middleware.json :as ring-json]
    [compojure.core :as compojure]
    [compojure.route :as route]
    [clojure.data.json :as json]
    [sangu.util :as util]
    [sangu.storage-memory :as storage]
  )
)

(defn list-step
  []
  (let [res (storage/list-step)]
    (if (nil? res)
      (json/write-str {})
      (json/write-str res)
    )
  )
)

(defn get-step
  [uuid]
  (let [res (storage/fetch-step uuid)]
    (if (nil? res)
      {:status 404}
      (json/write-str res)
    )
  )
)

(defn put-step
  [position longdesc shortdesc]
  (storage/create-step position longdesc shortdesc)
)

(defn delete-step
  [uuid]
  (storage/delete-step uuid)
)

(defn post-step
  [uuid position longdesc shortdesc]
  (let [vals {:position position :longdesc longdesc :shortdesc shortdesc}
        nilvals (for [[k v] vals :when (nil? v)] k)
        updates (apply dissoc vals nilvals)]
    (storage/update-step uuid updates)
  )
)

(compojure/defroutes myhandler
  (compojure/GET "/step" [] (list-step))
  (compojure/GET "/step/:uuid" [uuid] (get-step uuid))
  (compojure/PUT "/step" [position longdesc shortdesc]
    (put-step position longdesc shortdesc)
  )
  (compojure/DELETE "/step/:uuid" [uuid] (delete-step uuid))
  (compojure/POST "/step/:uuid" [uuid position longdesc shortdesc]
    (post-step uuid position longdesc shortdesc)
  )
  (route/not-found "Page not found")
)

(def app
  (-> myhandler
    (ring-json/wrap-json-params)
    (resource/wrap-resource "public")
    (file-info/wrap-file-info)
    (util/wrap-request-logging)
    (stacktrace/wrap-stacktrace)
  )
)

(defn -main [& args]
  (storage/create-step 0 "long0" "short0")
  (storage/create-step 1 "long1" "short1")
  (storage/create-step 2 "long2" "short2")
  (storage/create-step 3 "long3" "short3")
  (ring/run-jetty app {:port 3000})
)
