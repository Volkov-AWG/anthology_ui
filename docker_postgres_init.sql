CREATE TABLE anthologyTree
(
    id SERIAL,
    name character varying(100) NOT NULL,
    description character varying(256),
    content jsonb NOT NULL,
    DCreate TIMESTAMP DEFAULT NOW(),
    CONSTRAINT anthologyTree_key PRIMARY KEY (id)
);
Create table branch
(
	id serial,
	treeID int not null,
	keys character varying(256),
	CONSTRAINT branch_key PRIMARY KEY (id)
);
Create table urlList
(
	id serial,
	treeID int not null,
	branchID int not null,
	name character varying(1000),
	annotation character varying(1000),
	link character varying(1000),
	authors character varying(1000),
	journal character varying(1000),
	journal_link character varying(1000),
	CONSTRAINT urlList_key PRIMARY KEY (id)
)

    TABLESPACE pg_default;

ALTER TABLE anthologyTree
    OWNER to postgres;

insert into anthologyTree(name, description, content) values('demo tree', 'default demo tree','
    {
        "value": "main demo",
        "id": 1,
        "child": [
          {
            "value": " second demo1",
            "id": 2,
            "child": [
              {
                "value": "third demo1",
                "id": 3
              },
              {
                "value": "third demo2",
                "id": 4
              }
            ]
          },
          {
            "value": " second demo2",
            "id": 5,
            "child": [
              {
                "value": "fourth demo1",
                "id": 6
              },
              {
                "value": "fourth demo2",
                "id": 7
              }
            ]
          }
        ]
      }
');