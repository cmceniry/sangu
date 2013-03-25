(ns sangu.storage-memory
)

(def storage (ref {}))

(defn list-step
  []
  (keys @storage)
)

(defn fetch-step
  "Gets a single step."
  [uuid]
  (get @storage uuid)
)

(defn create-step
  "Creates a single step."
  [position longdesc shortdesc]
  (let [new-uuid (str (java.util.UUID/randomUUID))]
    (dosync
      (alter storage assoc
        new-uuid
        {
          :uuid new-uuid
          :longdesc longdesc
          :shortdesc shortdesc
        }
      )
    )
  )
)

(defn delete-step
  "Deletes a single step."
  [uuid]
  (dosync
    (alter storage dissoc uuid)
  )
)

(defn update-step
  "Updates a step."
  [uuid updates]
  (dosync
    (let [curval (@storage uuid)
          newval {uuid (merge curval updates)}]
      (alter storage merge newval)
    )
  )
)